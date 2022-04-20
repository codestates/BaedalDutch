import express from 'express';
import {
  partiesInfo,
  createParty,
  delParty,
  updateParty,
} from '../controllers/parties';

const partiesRouter = express.Router();

partiesRouter.get('/', partiesInfo);
partiesRouter.post('/', createParty);
partiesRouter.delete('/:id', delParty);
partiesRouter.patch('/:id', updateParty);

export default partiesRouter;
