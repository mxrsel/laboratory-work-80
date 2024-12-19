import {fileDb} from "../fileDb";
import {CategoryWithoutId} from "../types";
import express from "express";

export const categoriesRouter = express.Router()

categoriesRouter.get('/categories', async(_req, res) => {
    try {
        const categoryData = await fileDb.getInventory();
        res.send(categoryData.category);
    } catch(e) {
        console.error(e)
    }
});

categoriesRouter.get('/categories/:id', async (req, res) => {
    try {
        const resource = await fileDb.getResourcesById('category', req.params.id);
        res.send(resource)
    } catch(e) {
        console.error(e)
    }
})

categoriesRouter.post('/categories', async(req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).send('Please enter a name');
        }

        const newCategory: CategoryWithoutId = {
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription
        }

        const savedCategory = await fileDb.addInventoryResource(newCategory, 'category');
        res.send(savedCategory)
    } catch (e) {
        console.error(e)
    }
});

categoriesRouter.delete('/categories/:id', async(req, res) => {
    try {
        await fileDb.deleteResourceItem('category', req.params.id)
        res.send('item deleted');
    } catch(e) {
        console.error(e)
    }
})