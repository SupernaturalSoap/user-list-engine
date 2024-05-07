import { Request, Response, NextFunction, Router } from 'express';

import ListItemSvc from '../svc/listItem-svc';

const router: Router = Router();

const listItemSvc: ListItemSvc = new ListItemSvc();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listItem = await listItemSvc.create(req.body);
        res.status(201).json({ message: 'Successful', data: listItem });
    } catch (err) {
        next(err);
    }
});

router.patch('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listItem = await listItemSvc.update(req.body.id, req.body);
        res.status(200).json({ message: 'Successful', data: listItem });
    } catch (err) {
        next(err);
    }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await listItemSvc.removeListItem(req.body.id);
        res.send({ message: 'Sucessfully Removed From User List'});
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listItem = await listItemSvc.findById(req.params.id);
        res.send({ message: 'Sucessful', data: listItem ? listItem : null });
    } catch (err) {
        next(err);
    }
});

router.get('/userId/:userId', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = '1', limit = '100' } = req.query as any;
        const listItem = await listItemSvc.getUserListItems(req.params.userId, page, limit);
        const totalCount = await listItemSvc.countAllByUserId(req.params.userId);
        res.send({ message: 'Sucessful', data: {...listItem, pagination: { page : parseInt(page),  limit : parseInt(limit), total : totalCount }} });
    } catch (err) {
        next(err);
    }
});

export default router;