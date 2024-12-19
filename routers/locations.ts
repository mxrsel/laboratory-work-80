import {fileDb} from "../fileDb";
import {LocationWithoutId} from "../types";
import express from "express";

export const locationsRouter = express.Router();


locationsRouter.get('/locations', async(_req, res) => {
    try {
        const locationData = await fileDb.getInventory();
        res.send(locationData.location);
    } catch(e) {
        console.error(e)
    }
});

locationsRouter.get('/locations/:id', async (req, res) => {
    try {
        const resource = await fileDb.getResourcesById('location', req.params.id);
        res.send(resource)
    } catch(e) {
        console.error(e)
    }
})

locationsRouter.post('/locations', async(req, res) => {
    try {
        if (!req.body.locationName) {
            res.status(400).send('Please enter a name');
        }

        const newLocation: LocationWithoutId = {
            locationName: req.body.locationName,
            locationDescription: req.body.locationDescription
        }

        const savedLocation = await fileDb.addInventoryResource(newLocation, 'location');
        res.send(savedLocation)
    } catch (e) {
        console.error(e)
    }
});

locationsRouter.delete('/locations/:id', async(req, res) => {
    try {
        await fileDb.deleteResourceItem('location', req.params.id)
        res.send('item deleted');
    } catch(e) {
        console.error(e)
    }
})