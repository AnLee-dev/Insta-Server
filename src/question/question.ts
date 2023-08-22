import { Message } from '@line/bot-sdk';

// eslint-disable-next-line import/prefer-default-export
export const step0: Message | Message[] = {
  type: 'template',
  altText: '処方箋送信ありがとうございました。',
  template: {
    type: 'confirm',
    text: '処方箋送信ありがとうございました。',
    actions: [
      {
        type: 'message',
        label: '家で受け取り？',
        text: '家で受け取り？',
      },
      {
        type: 'message',
        label: '店頭で受け取り？',
        text: '店頭で受け取り？',
      },
    ],
  },
};

export const step1: Message | Message[] = {
  type: 'template',
  altText: 'this is a confirm template',
  template: {
    type: 'confirm',
    actions: [
      {
        type: 'message',
        label: 'はい',
        text: 'yes',
      },
      {
        type: 'message',
        label: 'いいえ',
        text: 'no',
      },
    ],
    text: '残薬は２日以上お持ちでしょうか？',
  },
};

export const step2: Message | Message[] = {
  type: 'template',
  altText: 'this is a buttons template',
  template: {
    type: 'buttons',
    imageBackgroundColor: '#FFFFFF',
    title: 'JVB',
    text: '問診票回答を回答お願いします。',
    actions: [
      {
        type: 'uri',
        label: '問診票回答',
        uri: 'https://liff.line.me/1660831561-9OqD6xko',
      },
    ],
  },
};

export const step3: Message | Message[] = {
  type: 'template',
  altText: 'this is a confirm template',
  template: {
    type: 'confirm',
    actions: [
      {
        type: 'message',
        label: '手帳写真送信',
        text: 'yes',
      },
      {
        type: 'message',
        label: 'なし',
        text: 'no',
      },
    ],
    text: 'お薬手帳はお持ちでしょうか？ある方は、写真を送信してください。',
  },
};

export const step4: Message | Message[] = {
  type: 'template',
  altText: 'this is a confirm template',
  template: {
    type: 'confirm',
    actions: [
      {
        type: 'datetimepicker',
        label: '予約時間を選択',
        data: 'time',
        mode: 'datetime',
        initial: '2023-05-26T10:27',
        max: '2024-05-26T10:27',
        min: '2022-05-26T10:27',
      },
      {
        type: 'message',
        label: 'いいえ',
        text: 'no',
      },
    ],
    text: 'オンライン服薬指導を実施しますか？、予約時間を選択してください。',
  },
};

export const step5 = (userName: string, date?: string): Message | Message[] => ({
  type: 'template',
  altText: 'this is a confirm template',
  template: {
    type: 'confirm',
    actions: [
      {
        type: 'message',
        label: '確認する',
        text: 'yes',
      },
      {
        type: 'message',
        label: 'キャンセル',
        text: 'no',
      },
    ],
    text: `この内容を確認します\nお名前：${userName}\n予約時間：${date}`,
  },
});

export const step6 = (linkZoom?: string, dateTime?: string): Message | Message[] => ({
  type: 'text',
  text: `ありがとうございます。\n${dateTime}にお待ちしております。\n${linkZoom}`,
});
