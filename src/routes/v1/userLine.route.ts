import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { userLineController, userLineValidation } from '../../modules/usersLine';

const router: Router = express.Router();

router.route('/').get(auth('getUsers'), validate(userLineValidation.getUsers), userLineController.getUsers);

export default router;

/**
 * @swagger
 * tags:
 *   name: UsersLine
 *   description: Users line management and retrieval
 */

/**
 * @swagger
 * /UsersLine:
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [UsersLine]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userLine
 *         schema:
 *           type: string
 *         description: userLine
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
