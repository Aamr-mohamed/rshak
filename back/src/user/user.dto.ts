import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  username: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  workAddress: string;
  gymAddress: string;
  gymTime: string;
  job: string;
  bodyType: string;
  foodType: string;
  specialMeals: string;
  monthlyCheckup: string;
  weeklyCheckupTimes: string;
  monthlyMealsCheckup: string;
  userNotes: string;
  height: number;
  weight: number;
  diabetesNum: number;
  age: number;
  disease1: string;
  disease2: string;
  disease3: string;
  disease4: string;
  medicine1: string;
  medicine2: string;
  medicine3: string;
  medicine4: string;
}
export class UserDataDto {
  username: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  workAddress: string;
  job: string;
  age: number;
}
export class BodyCheckup {
  id: string;
  disease1: string;
  disease2: string;
  disease3: string;
  disease4: string;
  medicine1: string;
  medicine2: string;
  medicine3: string;
  medicine4: string;
}

export class BodyInfo {
  id: string;
  foodType: string;
  gymAddress: string;
  gymTime: string;
  bodyType: string;
  height: number;
  weight: number;
  diabetesNum: number;
}
export class MealsSchedule {
  id: string;
  specialMeals: string;
  monthlyCheckup: string;
  userNotes: string;
}

export class CheckupDto {
  id: string;
  checkupName: string;
  checkupDate: string;
  checkupPercentage: string;
  checkupAverage: string;
  checkupDescription: string;
  checkupImageName: string;
  checkupImageFile: string;
}

export class MonthlyAttendance {
  id: string;
  userId: string;
  @ApiProperty({
    example: '2024-12-01T08:00:00Z',
    description: 'Date in ISO 8601 format',
  })
  date: string;
  @ApiProperty({
    example: 'true',
    description: 'true or false for attendance',
  })
  attendance: boolean;
}

export class MonthlyFoodDispensing {
  id: string;
  userId: string;

  @ApiProperty({
    example: '2024-12-01T08:00:00Z',
    description: 'Date in ISO 8601 format',
  })
  date: string;

  @ApiProperty({
    example: 'true',
    description: 'true or false for food dispensing',
  })
  foodDispensing: boolean;
}
