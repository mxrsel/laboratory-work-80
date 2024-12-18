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
    async addInventoryItem(resource: ItemWithoutId | LocationWithoutId | CategoryWithoutId, dataType: 'item' | 'location' | 'category') {
        const id = crypto.randomUUID().toString();
        const resourceWithId = { id, ...resource };

        if (dataType === 'item') {
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
    async save() {
        return fs.writeFile(file, JSON.stringify(data));
    }
}