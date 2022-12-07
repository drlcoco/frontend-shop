import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/i-product';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(productos: IProduct[], filterBy: string): IProduct[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;

    if (filter) {
      return productos.filter(producto => producto.title.toLocaleLowerCase().includes(filter) || producto.description.toLocaleLowerCase().includes(filter))
    }
    
    return productos;
  }

}
