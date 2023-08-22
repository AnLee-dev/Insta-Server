/* eslint-disable prettier/prettier */
import express, { Router } from 'express';
import { postController } from '../../modules/post';
import { auth } from '../../modules/auth';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), postController.createPost)
  .get(auth('getUsers'), postController.getPosts);

router
  .route('/:postId')
  .get(auth('getUsers'), postController.getPostById)
  .patch(auth('manageUsers'), postController.updatePost)
  .delete(auth('manageUsers'), postController.deletePost);

export default router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post response
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a post
 *     description: Only admins can create other post.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - media
 *               - comment
 *               - captionText
 *               - hasLiked
 *               - likeCount
 *               - publisherId
 *             properties:
 *               media:
 *                 type: object
 *               comment:
 *                 type: string
 *               captionText:
 *                 type: string
 *               hasLiked:
 *                 type: string
 *               likeCount:
 *                 type: string
 *             example:
 *               media: [
 *                 {
 *                   mediaUrl: https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&w=1000&q=80,
 *                   poster: https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&w=1000&q=80
 *                 },
 *               ]
 *               captionText: 'Caption test'
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: get all post
 *     description: Only admins can see all post.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: get all post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - media
 *                 - comment
 *                 - captionText
 *                 - hasLiked
 *                 - likeCount
 *                 - publisherId
 *               properties:
 *                 media:
 *                   type: object
 *                 comment:
 *                   type: string
 *                 captionText:
 *                   type: string
 *                 hasLiked:
 *                   type: string
 *                 likeCount:
 *                   type: string
 *                 publisherId:
 *                   type: string
 *               example:
 *                 id: 5ebac534954b54139806c112
 *                 media: [
 *                   {
 *                     mediaUrl: https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&w=1000&q=80,
 *                     poster: https://images.unsplash.com/photo-1521038199265-bc482db0f923?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fA%3D%3D&w=1000&q=80
 *                   },
 *                 ]
 *                 comment: []
 *                 captionText: 'Caption test'
 *                 hasLiked: true
 *                 likeCount: 20
 *                 publisherId: 645878f253cec6082c9fcd34
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: get post by id
 *     description: Only admins can see post.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: post id
 *     responses:
 *       "200":
 *         description: get post by id
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   patch:
 *     summary: Update post
 *     description: Update post of customer
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: object
 *               comment:
 *                 type: string
 *               captionText:
 *                   type: string
 *               hasLiked:
 *                 type: string
 *               likeCount:
 *                 type: string
 *               publisherId:
 *                 type: string
 *             example:
 *               id: 5ebac534954b54139806c112
 *               comment: []
 *               captionText: 'Caption test'
 *               hasLiked: true
 *               likeCount: 20
 *               publisherId: 645878f253cec6082c9fcd34
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete post information
 *     description: Delete post information
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: post id
 *     responses:
 *       "200":
 *         description: Nothing here!!!
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
