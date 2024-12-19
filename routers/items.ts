import express from 'express';
import {fileDb} from "../fileDb";
import {ItemWithoutId} from "../types";
import {imagesUpload} from "../multer";

export const itemsRouter = express.Router();

                            //ITEMS

itemsRouter.get('/items', async (_req, res) => {
    try {
        const itemData = await fileDb.getInventory();
        res.send(itemData.items);
    } catch (e) {
        console.error(e)
    }
})

itemsRouter.get('/items/:id', async (req, res) => {
   try {
       const resource = await fileDb.getResourcesById('items', req.params.id);
       res.send(resource)
   } catch(e) {
       console.error(e)
   }
})

itemsRouter.post('/items', imagesUpload.single('itemImage'), async(req, res) => {
   try {
       if (!req.body.itemName || !req.body.category_id || !req.body.location_id) {
           res.status(400).send({error: "Please enter a name"});
           return
       }

       const newItem: ItemWithoutId = {
           category_id: req.body.category_id,
           location_id: req.body.location_id,
           itemName: req.body.itemName,
           itemDescription: req.body.itemDescription,
           itemImage: req.file ? 'images/' + req.file.filename : null,
           date: new Date().toISOString()
       };

       const savedItem = await fileDb.addInventoryResource(newItem, "items");
       res.send(savedItem)
   } catch (e) {
       console.error(e)
   }
});

itemsRouter.delete('/items/:id', async(req, res) => {
    try {
        await fileDb.deleteResourceItem('items', req.params.id)
        res.send('item deleted');
    } catch(e) {
        console.error(e)
    }
})