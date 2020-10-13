import { ContactUnitDTO } from './contact-unit.dto';
import { ContactPersonDTO } from './contact-person.dto';
export class GetContactsDTO {
  role: string;
  unit: Array<ContactUnitDTO>;
  company: string;
  person: Array<ContactPersonDTO>;
}
