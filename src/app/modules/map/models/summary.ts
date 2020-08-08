import { Country } from './country';
import { Global } from './global';

export class Summary {

    /** global cases */
    Global: Global;

    /** the list of the new and total cases per country */
    Countries: Country[];

    /** Date */
    Date: Date;

}
