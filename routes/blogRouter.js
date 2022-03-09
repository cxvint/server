const Router = require('express');
const blogController = require('../controllers/blogController');
const router = new Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Blog:
 *          type: object
 *          required:
 *              - name
 *              - author
 *              - text
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the blog
 *              name:
 *                  type: string
 *                  description: The blog name
 *              author:
 *                  type: string
 *                  description: The blog author
 *              text:
 *                  type: string
 *                  description: The blog text
 *          example:
 *              name: Audi a8
 *              author: admin
 *              text: audi a8 audi a8 audi a8
 */

/**
 * @swagger
 * /blog:
 *    get:
 *      summary: Returns the list of all the blogs
 *      description: Get blog
 *      responses:
 *        200:
 *          description: The list of the books
 *
 */
router.post('/', blogController.create);

router.get('/', blogController.getAll);

router.get('/:id', blogController.getOne);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);

module.exports = router;
