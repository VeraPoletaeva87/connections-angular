import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../types';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Item[], searchText: string): Item[] {
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item: Item) => {
      const itemString = JSON.stringify(item).toLowerCase();
      return itemString.includes(searchText);
    });
  }
}
