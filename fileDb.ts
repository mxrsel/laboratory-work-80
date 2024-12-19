import {Category, CategoryWithoutId, Item, ItemLocation, ItemWithoutId, LocationWithoutId} from "./types";
import {promises as fs} from "fs";

const file = './db.json';
let data: {
    items: Item[],
    location: ItemLocation[],
    category: Category[]
} = {
    items: [],
    location: [],
    category: []
};

export const fileDb = {
    async init() {
        try{
            const content = await fs.readFile(file);
            data = await JSON.parse(content.toString());
        } catch (e) {
            console.error(e)
        }
    },
    async getInventory() {
        return  data
    },
    async addInventoryResource(resource: ItemWithoutId | LocationWithoutId | CategoryWithoutId, dataType: 'items' | 'location' | 'category') {
        const id = crypto.randomUUID().toString();
        const resourceWithId = { id, ...resource };

        if (dataType === 'items') {
            data.items = data.items || [];
            data.items.push(resourceWithId as Item);
        } else if (dataType === 'location') {
            data.location = data.location || [];
            data.location.push(resourceWithId as ItemLocation);
        } else if (dataType === 'category') {
            data.category = data.category || [];
            data.category.push(resourceWithId as Category);
        }

        console.log(`items: ${dataType}:`, resourceWithId)


        await this.save();
        return resourceWithId;
    },

    async getResourcesById(resource: 'items' | 'location' | 'category', id: string) {
        const resources = data[resource];
        const findResourceById = resources.find((resource) => resource.id === id);
        if(!findResourceById) console.error('Resource not found!');
        return findResourceById
    },

    async deleteResourceItem(resource: 'items' | 'location' | 'category', id: string) {
        const resources = data[resource];
        const deleteResource = resources.findIndex((resource) => resource.id === id);
        if(deleteResource === -1) console.log("Current resource doesn't exist")
        data[resource].splice(deleteResource, 0);
        await this.save()
    },

    async save() {
        return fs.writeFile(file, JSON.stringify(data));
    }
}