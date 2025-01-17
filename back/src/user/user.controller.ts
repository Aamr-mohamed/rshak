import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  BadRequestException,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Patch,
  UploadedFiles,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BodyCheckup,
  BodyInfo,
  CheckupDto,
  MealsSchedule,
  MonthlyAttendance,
  MonthlyFoodDispensing,
  UserDataDto,
  UserDto,
} from './user.dto';
import { UserService } from './user.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('adduser')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  @UseInterceptors(AnyFilesInterceptor()) // Adjust the field name to match the frontend key
  async createUser(
    @Body() body: UserDto,
    @UploadedFiles() files: Array<Express.Multer.File>, // Multiple files will be uploaded here
    @Body('checkups') checkups: string, // Checkup data (JSON string)
  ) {
    try {
      console.log('User Data:', body);
      console.log('Uploaded Files:', files);

      let parsedCheckups: CheckupDto[] = JSON.parse(checkups);
      console.log('Parsed Checkups:', parsedCheckups);

      // Link files to corresponding checkups
      parsedCheckups = parsedCheckups.map((checkup, index) => {
        // If a file is uploaded for this checkup, link the file name and path
        if (files[index]) {
          checkup.checkupImageName = files[index].filename;
          checkup.checkupImageFile = files[index].path; // You can store the path as well
        }
        return checkup;
      });

      // Call the service method to save the user and checkups
      const result = await this.userService.addUser(body, parsedCheckups);

      return { result, message: 'User created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message); // Handle the error properly
    }
  }

  // @Post('adduser')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'add user' })
  // @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  // @UseInterceptors(AnyFilesInterceptor())
  // async createUser(
  //   @Body() body: UserDto,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body('checkups')
  //   checkups: string,
  // ) {
  //   try {
  //     console.log(body);
  //     console.log('file', files);
  //     let parsedCheckups: CheckupDto[];
  //     parsedCheckups = JSON.parse(checkups);
  //     console.log('Parsed Checkups:', parsedCheckups);
  //     // for (const checkup of checkups) {
  //     //   console.log(checkup);
  //     // }
  //     // console.log('checkups', checkups[0]);
  //     const result = await this.userService.addUser(
  //       body,
  //       files,
  //       parsedCheckups,
  //     );
  //     return { result, message: 'User created successfully' };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //     //needs changing to not show the real error message
  //   }
  // }
  @Get('getusers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return { users, message: 'Users found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('find/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  async getUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUser(id);
      return { user, message: 'User found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.userService.deleteUser(id);
      return { user, message: 'User deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/user/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDataDto })
  async updateUser(@Param('id') id: string, @Body() body: UserDataDto) {
    try {
      const user = await this.userService.updateUser(id, body);
      return { user, message: 'User updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/meds/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update diseases and medicines' })
  @ApiResponse({ status: HttpStatus.OK, type: BodyCheckup })
  async updateDiseasesMeds(@Param('id') id: string, @Body() body: BodyCheckup) {
    try {
      const user = await this.userService.updateDiseasesMeds(id, body);
      return { user, message: 'Diseases and medicines updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/bodyinfo/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update body info' })
  @ApiResponse({ status: HttpStatus.OK, type: BodyInfo })
  async updateBodyInfo(@Param('id') id: string, @Body() body: BodyInfo) {
    try {
      const user = await this.userService.updateBodyInfo(id, body);
      return { user, message: 'Body info updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/checkups/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update checkups' })
  @ApiResponse({ status: HttpStatus.OK, type: CheckupDto })
  async updateCheckups(@Param('id') id: string, @Body() body: BodyCheckup) {
    try {
      const user = await this.userService.updateCheckups(id, body);
      return { user, message: 'Diseases and medicines updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/meals/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update meals' })
  @ApiResponse({ status: HttpStatus.OK, type: MealsSchedule })
  async updateMealsSchedule(
    @Param('id') id: string,
    @Body() body: MealsSchedule,
  ) {
    try {
      const user = await this.userService.updateMealsSchedule(id, body);
      return { user, message: 'Meals updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/attendance/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: MonthlyAttendance })
  async attendanceMonthly(
    @Param('id') id: string,
    @Body() body: MonthlyAttendance[],
  ) {
    try {
      const user = await this.userService.attendanceMonthly(id, body);
      return { user, message: 'Attendance updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('attendance/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: MonthlyAttendance })
  async getAttendanceMonthly(@Param('id') id: string) {
    try {
      const attendance = await this.userService.getAttendanceMonthly(id);
      return { attendance, message: 'Attendance found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('fooddispensing/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get attendance' })
  @ApiResponse({ status: HttpStatus.OK, type: MonthlyAttendance })
  async getFoodDispensingMonthly(@Param('id') id: string) {
    try {
      const foodDispensing =
        await this.userService.getFoodDispensingMonthly(id);
      return { foodDispensing, message: 'Food dispensing found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('update/fooddispensing/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update food dispensing' })
  @ApiResponse({ status: HttpStatus.OK })
  async foodDispensingMonthly(
    @Param('id') id: string,
    @Body() body: MonthlyFoodDispensing[],
  ) {
    try {
      const user = await this.userService.foodDispensingMonthly(id, body);
      return { user, message: 'Food dispensing updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('weight/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get user weight' })
  @ApiResponse({ status: HttpStatus.OK })
  async getUserWeight(@Param('id') id: string) {
    try {
      const weights = await this.userService.getUserWeight(id);
      return { weights, message: 'User weight found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('diabetes/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users diabetes' })
  @ApiResponse({ status: HttpStatus.OK })
  async usersDiabetes(@Param('id') id: string) {
    try {
      console.log('Daaaaaaaamn');
      const diabetes = await this.userService.getUserDiabetes(id);
      return { diabetes, message: "Users' diabetes found successfully" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('all-weights')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users weight' })
  @ApiResponse({ status: HttpStatus.OK })
  async usersWeight() {
    try {
      console.log('Daaaaaaaamn');
      const weights = await this.userService.getUsersWeight();
      return { weights, message: "Users' weights found successfully" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('bodytypes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users body types and percentages' })
  @ApiResponse({ status: HttpStatus.OK })
  async getUsersBodyTypesPercentages() {
    try {
      const bodyTypes = await this.userService.getUsersBodyTypesPercentages();
      return { bodyTypes, message: 'Users body types and percentages found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('diseases')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users diseases and medicines' })
  @ApiResponse({ status: HttpStatus.OK, type: Array })
  async getUsersDiseases() {
    try {
      const diseases = await this.userService.getUsersDiseasesPercentages();
      return { diseases, message: 'Users diseases found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Get('medicines')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users medicines and percentages' })
  @ApiResponse({ status: HttpStatus.OK, type: Array })
  async getUsersMedicines() {
    try {
      const medicines = await this.userService.getUsersmedicinesPercentages();
      return { medicines, message: 'Users medicines found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('ages')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get users ages and percentages' })
  @ApiResponse({ status: HttpStatus.OK, type: Array })
  async getUsersAgesPercentages() {
    try {
      const ages = await this.userService.getUsersAgesPercentages();
      return { ages, message: 'Users ages and percentages found' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post('daily-update/bodyinfo/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update body info' })
  @ApiResponse({ status: HttpStatus.OK, type: BodyInfo })
  async dailyUpdateBodyInfo(@Param('id') id: string, @Body() body: BodyInfo) {
    try {
      const user = await this.userService.dailyUpdateBodyInfo(id, body);
      return { user, message: 'Body info updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Patch(':userId/checkups/edit/:checkups')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update checkups' })
  @ApiResponse({ status: HttpStatus.OK, type: BodyCheckup })
  @UseInterceptors(
    FileInterceptor('checkupImage', {
      storage: diskStorage({
        destination: './uploads', // Directory to store uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async editCheckup(
    @Param('userId') userId: string,
    @Param('checkups') checkupId: string,
    @Body() body: CheckupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        body.checkupImageName = file.filename; // Attach the filename to the body
      }
      console.log('body', body);
      const checkup = await this.userService.editCheckup(
        userId,
        checkupId,
        body,
      );
      return { checkup, message: 'Checkup updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':userId/checkups/:checkupId')
  async deleteCheckup(
    @Param('userId') userId: string,
    @Param('checkupId') checkupId: string,
  ) {
    try {
      // Call the service method to delete the checkup
      const deletedUser = await this.userService.deleteCheckup(
        userId,
        checkupId,
      );
      return {
        message: 'Checkup deleted successfully',
        deletedUser,
      };
    } catch (error) {
      // Handle errors appropriately
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      // In case of other errors, send a bad request response
      throw new BadRequestException(
        'Failed to delete checkup: ' + error.message,
      );
    }
  }
  @Post('/checkup/add/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'add new checkup' })
  @ApiResponse({ status: HttpStatus.OK, type: CheckupDto })
  @UseInterceptors(FileInterceptor('checkupImage'))
  async addNewCheckup(
    @Param('id') id: string,
    @Body() checkup: CheckupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        console.log('File received:', file);
        checkup.checkupImageName = file.filename;
        checkup.checkupImageFile = file.path;
        console.log('Image Name:', checkup.checkupImageName);
        console.log('Image Path:', checkup.checkupImageFile);
      } else {
        console.log('No file received');
      }
      const newCheckup = await this.userService.addNewCheckup(id, checkup);
      return newCheckup;
    } catch (error) {
      // Handle errors appropriately
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      // In case of other errors, send a bad request response
      throw new BadRequestException(
        'Failed to add new checkup: ' + error.message,
      );
    }
  }
}
