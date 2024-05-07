import { Router } from 'express';

import ListItemRouters from './list-item-router';

const router: Router = Router();

router.use('/listItem', ListItemRouters);

export default router;