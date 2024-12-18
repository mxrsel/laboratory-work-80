import express from 'express';
import {fileDb} from "../fileDb";
import {CategoryWithoutId, ItemWithoutId, LocationWithoutId} from "../types";
import {imagesUpload} from "../multer";

export const inventoryRouter = express.Router();

                            //ITEMS

inventoryRouter.get('/items', async (_req, res) => {
    try {
        const itemData = await fileDb.getInventory();
        res.send(itemData.items);
    } catch (e) {
        console.error(e)
    }
})

inventoryRouter.post('/items', imagesUpload.single('image'), async(req, res) => {
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

       const savedItem = await fileDb.addInventoryItem(newItem, "item");
       res.send(savedItem)
   } catch (e) {
       console.error(e)
   }
});

                        //LOCATIONS

inventoryRouter.get('/locations', async(_req, res) => {
   try {
       const locationData = await fileDb.getInventory();
       res.send(locationData.location);
   } catch(e) {
       console.error(e)
   }
});

inventoryRouter.post('/locations', async(req, res) => {
   try {
       if (!req.body.locationName) {
           res.status(400).send('Please enter a name');
       }

       const newLocation: LocationWithoutId = {
           locationName: req.body.locationName,
           locationDescription: req.body.locationDescription
       }

       const savedLocation = await fileDb.addInventoryItem(newLocation, 'location');
       res.send(savedLocation)
   } catch (e) {
       console.error(e)
   }
});

                            //CATEGORY

inventoryRouter.get('/category', async(_req, res) => {
    try {
        const categoryData = await fileDb.getInventory();
        res.send(categoryData.category);
    } catch(e) {
        console.error(e)
    }
});

inventoryRouter.post('/category', async(req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).send('Please enter a name');
        }

        const newCategory: CategoryWithoutId = {
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription
        }

        const savedCategory = await fileDb.addInventoryItem(newCategory, 'category');
        res.send(savedCategory)
    } catch (e) {
        console.error(e)
    }
})