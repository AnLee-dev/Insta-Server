import { MessageAPIResponseBase, WebhookEvent } from '@line/bot-sdk/dist/types';
import axios from 'axios';
import moment from 'moment';
import { lineSdk } from '../utils/lineBot';
import { createUserLine, getUserLineById } from '../usersLine/userLine.service';
import { IUserLine } from '../usersLine/userLine.interfaces';
import { TSession } from '../chatSession/chatSession.interfaces';
import { createSession, findSessionLastest } from '../chatSession/chatSession.service';
import { step0, step1, step2, step3, step4, step5, step6 } from '../../question/question';
import zoomController from '../zoom/index.controller';
import { TMetting } from '../metting/metting.interfaces';
import { createMetting } from '../metting/metting.service';

type DateTimePostback = {
  date?: string;
  time?: string;
  datetime?: string;
};

const messageController = () => {
  const replyMessage = async (event: WebhookEvent): Promise<void | MessageAPIResponseBase> => {
    if (event?.type === 'follow' || event?.type === 'unfollow') {
      // Follow
      if (event?.type === 'follow') {
        const userProfile = await lineSdk.getProfile(event.source.userId as string);
        const data: IUserLine = {
          userLine: userProfile.userId,
          userName: userProfile.displayName,
          pictureUrl: userProfile.pictureUrl,
          statusMessage: userProfile.statusMessage,
          language: userProfile.language || 'jp',
          address: '',
          phone: '',
        };
        const user = await createUserLine(data);
        if (user.session) {
          const newSession: TSession = {
            status: false,
            currentStep: 0,
            userLine: user.userLine,
            userName: user.userName,
          };
          try {
            const sessionData = await createSession(newSession);
            user.session.push(sessionData._id);
            user.save();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }
      }
    } else if (event?.type === 'message' || event?.type === 'postback') {
      const sessionData = await findSessionLastest(event?.source?.userId || '');
      if (event?.type === 'message') {
        if (event?.message.type === 'image') {
          if (sessionData?.currentStep === 0) {
            sessionData.currentStep += 1;
            sessionData.save();
          }
          const userById = await getUserLineById(event.source.userId || '');
          if (userById && userById.session) {
            const newSession: TSession = {
              status: false,
              currentStep: 1,
              userLine: userById.userLine,
              userName: userById.userName,
            };
            const sessionStep0 = await createSession(newSession);
            userById.session.push(sessionStep0._id);
            userById.save();
          }
          return lineSdk.replyMessage(event.replyToken, step0);
        }
        // Message type text
        if (event?.message.type === 'text') {
          // Step1
          if (sessionData?.currentStep === 1) {
            sessionData.currentStep += 1;
            sessionData.save();
            return lineSdk.replyMessage(event.replyToken, step1);
          }
          // Step2
          if (sessionData?.currentStep === 2 && event?.message.text === 'yes') {
            sessionData.currentStep += 1;
            sessionData.save();
            return lineSdk.replyMessage(event.replyToken, step2);
          }
          // Step3
          if (sessionData?.currentStep === 3) {
            const myArrayText = event.message.text.split('\n').slice(1);
            sessionData.questionnaires = myArrayText;
            sessionData.currentStep += 1;
            sessionData.save();
            return lineSdk.replyMessage(event.replyToken, step3);
          }
          // Step4
          if (sessionData?.currentStep === 4) {
            sessionData.currentStep += 1;
            sessionData.save();
            return lineSdk.replyMessage(event.replyToken, step4);
          }
          // Step6
          if (sessionData?.currentStep === 6 && sessionData.mettingDate) {
            try {
              const zoom = await axios(zoomController());
              const metting: TMetting = {
                zoomId: zoom.data.uuid,
                userLine: sessionData.userLine,
                userName: sessionData.userName,
                timeStart: new Date(sessionData.mettingDate),
                linkHost: zoom.data.start_url,
                linkJoin: zoom.data.join_url,
              };
              const mettingData = await createMetting(metting);
              if (metting) sessionData.metting = mettingData.id;
              sessionData.currentStep += 1;
              sessionData.save();
              return await lineSdk.replyMessage(
                event.replyToken,
                step6(zoom.data.join_url, String(sessionData.mettingDate))
              );
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log('error', error);
            }
          }
        }
      }
      if (event?.type === 'postback') {
        // Step5
        if (sessionData?.currentStep === 5) {
          const { datetime } = event.postback?.params as DateTimePostback;
          sessionData.currentStep += 1;
          sessionData.mettingDate = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
          sessionData.save();
          return lineSdk.replyMessage(event.replyToken, step5(sessionData.userName, datetime));
        }
      }
    }
  };
  return { replyMessage };
};

export default messageController;
