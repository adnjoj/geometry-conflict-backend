import { PickType } from '@nestjs/mapped-types';
import { AddClipDto } from './add-clip.dto';

export class RemoveClipDto extends PickType(AddClipDto, ['clip']) {}
