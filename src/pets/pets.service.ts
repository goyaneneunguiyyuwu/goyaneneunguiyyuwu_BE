import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from 'src/users/entities/family.entity';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
  ) {}
  async create(familyId: number, createPetDto: CreatePetDto): Promise<void> {
    const newPet = this.petRepository.create({ ...createPetDto });
    const targetFamily = await this.familyRepository.findOne({
      id: familyId,
    });
    if (targetFamily === undefined)
      throw new NotFoundException('가족이 존재하지 않습니다.');

    newPet.family = targetFamily;
    await this.petRepository.save(newPet);
  }

  async info(familyId: number, petId: number): Promise<Pet> {
    // TODO: petId가 string이였는데 type check가 되지 않았다. 조치가 필요하다. 내일 질문하자.
    const pet = await this.petRepository.findOne({
      where: { id: petId },
      relations: ['family'],
    });

    if (pet.family.id !== familyId) {
      throw new NotAcceptableException(
        '해당 유저가 접근 할 수 없는 반려동물입니다.',
      );
    }

    return pet;
  }

  async modify(
    familyId: number,
    petId: number,
    updatePetDto: UpdatePetDto,
  ): Promise<void> {
    const oldPet = await this.petRepository.findOne({
      where: { id: petId },
      relations: ['family'],
    });
    if (oldPet.family.id !== familyId) {
      throw new NotAcceptableException(
        '해당 유저가 접근 할 수 없는 반려동물입니다.',
      );
    }
    // // parseFloat를 사용해야 소수점도 변환이 된다.
    // const targetPet = this.copyObjectDeep(oldPet);
    // targetPet.weight = parseFloat(oldPet.weight);
    // targetPet.birthDate = oldPet.birthDate.toISOString();
    // targetPet.togetherDate = oldPet.togetherDate.toISOString();
    // delete targetPet.id;
    // delete targetPet.family;

    const modifiedPet = this.petRepository.create(updatePetDto);
    modifiedPet.id = petId;
    // for (const key in targetPet) {
    //   if (targetPet[key] !== modifiedPet[key]) {
    //     modifiedPet[key] = 1;
    //   }
    // }
    await this.petRepository.save(modifiedPet);
  }

  // copyObjectDeep = target => {
  //   let result = {};
  //   if (typeof target === 'object' && target !== null) {
  //     for (const prop in target) {
  //       result[prop] = this.copyObjectDeep(target[prop]);
  //     }
  //   } else {
  //     result = target;
  //   }
  //   return target;
  // };

  async getPetsByFamilyId(familyId) {
    const pets = await this.familyRepository.findOne({
      where: { id: familyId },
      relations: ['pets'],
    });
    return pets;
  }
}
