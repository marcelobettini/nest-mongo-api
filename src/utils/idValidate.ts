import { BadRequestException } from '@nestjs/common';
export default function idValidate(id: string) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new BadRequestException('Invalid ID format');
  }
}
