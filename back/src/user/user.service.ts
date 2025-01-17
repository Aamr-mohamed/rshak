import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) {
      return { message: 'No users found' };
    }
    return users;
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        checkups: true,
        bodyInfo: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        bodyCheckup: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        monthlyAttendance: true,
        monthlyFoodDispensing: true,
        mealsSchedule: true,
      },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    // Extract the first items from bodyInfo and bodyCheckup
    const latestBodyInfo = user.bodyInfo[0] || {};
    const latestBodyCheckup = user.bodyCheckup[0] || {};

    return {
      ...user,
      bodyInfo: latestBodyInfo,
      bodyCheckup: latestBodyCheckup,
    };
  }

  async addUser(user: UserDto, checkups: CheckupDto[]) {
    const newUser = await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        homeAddress: user.homeAddress,
        workAddress: user.workAddress,
        age: Number(user.age),
        job: user.job,
        mealsSchedule: {
          create: {
            specialMeals: user.specialMeals || 'No special meals specified ',
            monthlyCheckup:
              user.monthlyCheckup || 'No monthly checkup specified ',
            userNotes: user.userNotes || 'No notes specified ',
          },
        },
        bodyInfo: {
          create: {
            foodType: user.foodType || 'No food type specified ',
            gymAddress: user.gymAddress || 'No gym address specified ',
            gymTime: user.gymTime || 'No gym time specified ',
            bodyType: user.bodyType || 'No body type specified ',
            height: Number(user.height) || 0,
            weight: Number(user.weight) || 0,
            diabetesNum: Number(user.diabetesNum) || 0,
          },
        },

        bodyCheckup: {
          create: {
            disease1: user.disease1 || null,
            disease2: user.disease2 || null,
            disease3: user.disease3 || null,
            disease4: user.disease4 || null,
            medicine1: user.medicine1 || null,
            medicine2: user.medicine2 || null,
            medicine3: user.medicine3 || null,
            medicine4: user.medicine4 || null,
          },
        },
        checkups: {
          create: checkups.map((checkup) => ({
            checkupName: checkup.checkupName || null,
            checkupDate: checkup.checkupDate || null,
            checkupPercentage: checkup.checkupPercentage || null,
            checkupAverage: checkup.checkupAverage || null,
            checkupDescription: checkup.checkupDescription || null,
            checkupImageName: checkup.checkupImageName || null,
          })),
        },
      },
    });
    return newUser;
  }
  async updateUser(id: string, user: UserDataDto) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        homeAddress: user.homeAddress,
        workAddress: user.workAddress,
        job: user.job,
        age: user.age,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  async updateDiseasesMeds(id: string, data: BodyCheckup) {
    if (!id) {
      throw new Error('User ID is required');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        bodyCheckup: {
          update: {
            where: { id: data.id }, // Specify which bodyCheckup record to update
            data: {
              disease1: data.disease1,
              disease2: data.disease2,
              disease3: data.disease3,
              disease4: data.disease4,
              medicine1: data.medicine1,
              medicine2: data.medicine2,
              medicine3: data.medicine3,
              medicine4: data.medicine4,
            },
          },
        },
      },
    });

    return updatedUser;
  }

  async updateBodyInfo(id: string, data: BodyInfo) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        bodyInfo: {
          update: {
            where: { id: data.id },
            data: {
              foodType: data.foodType,
              gymAddress: data.gymAddress,
              gymTime: data.gymTime,
              bodyType: data.bodyType,
              height: data.height,
              weight: data.weight,
              diabetesNum: data.diabetesNum,
            },
          },
        },
      },
    });
    return updatedUser;
  }

  async updateCheckups(id: string, data: BodyCheckup) {
    if (!id) {
      throw new Error('User ID is required');
    }
    console.log('data', data);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        bodyCheckup: {
          update: {
            where: { id: data.id },
            data: {
              disease1: data.disease1,
              disease2: data.disease2,
              disease3: data.disease3,
              disease4: data.disease4,
              medicine1: data.medicine1,
              medicine2: data.medicine2,
              medicine3: data.medicine3,
              medicine4: data.medicine4,
            },
          },
        },
      },
    });

    return updatedUser;
  }

  async attendanceMonthly(id: string, data: MonthlyAttendance[]) {
    if (!id) {
      throw new Error('User ID is required');
    }

    // Iterate over the array of attendance data
    const results = await Promise.all(
      data.map(async (record) => {
        // Check if a record already exists for the given user and date
        const existingRecord = await this.prisma.monthlyAttendance.findFirst({
          where: {
            userId: id,
            date: record.date,
          },
        });

        if (existingRecord) {
          // Update the existing record's attendance
          return this.prisma.monthlyAttendance.update({
            where: {
              id: existingRecord.id,
            },
            data: {
              attendance: record.attendance,
            },
          });
        } else {
          // Create a new record if it doesn't exist
          return this.prisma.monthlyAttendance.create({
            data: {
              userId: id,
              date: record.date,
              attendance: record.attendance,
            },
          });
        }
      }),
    );

    return results; // Return all results
  }
  async getAttendanceMonthly(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }

    const attendance = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        monthlyAttendance: true, // Include all attendance records for the user
      },
    });

    if (!attendance) {
      throw new Error('User not found');
    }

    return attendance.monthlyAttendance;
  }

  async getFoodDispensingMonthly(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }

    const attendance = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        monthlyFoodDispensing: true,
      },
    });

    if (!attendance) {
      throw new Error('User not found');
    }

    return attendance.monthlyFoodDispensing;
  }

  async foodDispensingMonthly(id: string, data: MonthlyFoodDispensing[]) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const results = await Promise.all(
      data.map(async (record) => {
        // Check if a record already exists for the given user and date
        const existingRecord =
          await this.prisma.monthlyFoodDispensing.findFirst({
            where: {
              userId: id,
              date: record.date,
            },
          });

        if (existingRecord) {
          // Update the existing record's attendance
          return this.prisma.monthlyFoodDispensing.update({
            where: {
              id: existingRecord.id,
            },
            data: {
              foodDispensing: record.foodDispensing,
            },
          });
        } else {
          // Create a new record if it doesn't exist
          return this.prisma.monthlyFoodDispensing.create({
            data: {
              userId: id,
              date: record.date,
              foodDispensing: record.foodDispensing,
            },
          });
        }
      }),
    );

    return results;
  }

  async updateMealsSchedule(id: string, data: MealsSchedule) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        mealsSchedule: {
          update: {
            where: { id: data.id },
            data: {
              specialMeals: data.specialMeals,
              monthlyCheckup: data.monthlyCheckup,
              userNotes: data.userNotes,
            },
          },
        },
      },
    });
    return updatedUser;
  }

  async getUserWeight(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }

    // Get all bodyInfo records for this user, ordered by date
    const bodyInfoRecords = await this.prisma.bodyInfo.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        date: 'desc', // Get newest first
      },
      select: {
        createdAt: true,
        weight: true, // Only select the weight field
        date: true, // Include date for reference
      },
    });

    if (!bodyInfoRecords || bodyInfoRecords.length === 0) {
      return { message: 'No weight records found for this user' };
    }

    // Extract just the weights into an array
    const weights = bodyInfoRecords.map((record) => record.weight);

    // Return both weights array and message
    return weights;
  }

  async getUserDiabetes(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const bodyInfoRecords = await this.prisma.bodyInfo.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        date: 'desc', // Get newest first
      },
      select: {
        createdAt: true,
        diabetesNum: true, // Only select the diabetesNum field
        date: true, // Include date for reference
      },
    });

    if (!bodyInfoRecords || bodyInfoRecords.length === 0) {
      return { message: 'No diabetes records found for this user' };
    }

    // Extract just the weights into an array
    const diabetesNums = bodyInfoRecords.map((record) => record.diabetesNum);
    const dates = bodyInfoRecords.map((record) => record.createdAt);

    // Return both weights array and message
    return { diabetesNums, dates };
  }

  async getUsersWeight() {
    const users = await this.prisma.user.findMany({
      include: { bodyInfo: true },
    });

    if (!users.length) {
      throw new Error('No users found');
    }

    const weights = users.flatMap(
      (user) => user.bodyInfo?.map((info) => info.weight) || [],
    );

    return weights;
  }

  async getUsersDiseasesPercentages() {
    const users = await this.prisma.user.findMany({
      include: { bodyCheckup: true },
    });

    if (users.length === 0) {
      return { message: 'No users found' };
    }

    // Aggregate all diseases from bodyCheckup
    const diseases = [];
    users.forEach((user) => {
      user.bodyCheckup?.forEach((checkup) => {
        diseases.push(
          checkup.disease1,
          checkup.disease2,
          checkup.disease3,
          checkup.disease4,
        );
      });
    });

    // Filter out null/undefined values
    const validDiseases = diseases.filter(Boolean);

    if (validDiseases.length === 0) {
      return { message: 'No diseases found in bodyCheckup data' };
    }

    // Count occurrences of each disease
    const diseaseCounts = validDiseases.reduce((acc, disease) => {
      acc[disease] = (acc[disease] || 0) + 1;
      return acc;
    }, {});

    // Calculate percentages
    const totalDiseases = validDiseases.length;
    const percentages = Object.entries(diseaseCounts).map(
      ([disease, count]) => ({
        disease,
        percentage: ((Number(count) / totalDiseases) * 100).toFixed(2),
      }),
    );

    return percentages;
  }

  async getUsersmedicinesPercentages() {
    const users = await this.prisma.user.findMany({
      include: { bodyCheckup: true },
    });

    if (users.length === 0) {
      return { message: 'No users found' };
    }

    // Aggregate all diseases from bodyCheckup
    const medicines = [];
    users.forEach((user) => {
      user.bodyCheckup?.forEach((checkup) => {
        medicines.push(
          checkup.medicine1,
          checkup.medicine2,
          checkup.medicine3,
          checkup.medicine4,
        );
      });
    });

    // Filter out null/undefined values
    const validMedicines = medicines.filter(Boolean);

    if (validMedicines.length === 0) {
      return { message: 'No diseases found in bodyCheckup data' };
    }

    // Count occurrences of each disease
    const medicineCounts = validMedicines.reduce((acc, medicine) => {
      acc[medicine] = (acc[medicine] || 0) + 1;
      return acc;
    }, {});

    // Calculate percentages
    const totalMedicines = validMedicines.length;
    const percentages = Object.entries(medicineCounts).map(
      ([medicine, count]) => ({
        medicine,
        percentage: ((Number(count) / totalMedicines) * 100).toFixed(2),
      }),
    );

    return percentages;
  }

  async getUsersBodyTypesPercentages() {
    const users = await this.prisma.user.findMany({
      include: { bodyInfo: true },
    });

    if (users.length === 0) {
      return { message: 'No users found' };
    }

    // Extract the latest bodyInfo based on the date field for each user
    const latestBodyTypes = users
      .map((user) => {
        if (user.bodyInfo.length > 0) {
          // Sort bodyInfo by date in descending order and pick the latest
          const latestBodyInfo = user.bodyInfo.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )[0];
          return latestBodyInfo.bodyType;
        }
        return null;
      })
      .filter((bodyType) => bodyType !== null); // Filter out users with no valid bodyType

    if (latestBodyTypes.length === 0) {
      return { message: 'No valid bodyInfo entries found for users' };
    }

    // Count occurrences of each bodyType
    const bodyTypeCounts = latestBodyTypes.reduce((acc, bodyType) => {
      acc[bodyType] = (acc[bodyType] || 0) + 1;
      return acc;
    }, {});

    // Calculate percentages
    const totalUsersWithBodyInfo = latestBodyTypes.length;
    const percentages = Object.entries(bodyTypeCounts).map(
      ([bodyType, count]) => ({
        range: bodyType,
        percentage: ((Number(count) / totalUsersWithBodyInfo) * 100).toFixed(2),
      }),
    );
    const usersNumber = await this.prisma.user.count();

    return { percentages, usersNumber };
  }

  async getUsersAgesPercentages() {
    const users = await this.prisma.user.findMany({
      select: { age: true },
    });

    if (users.length === 0) {
      return { message: 'No users found' };
    }

    const ageRanges = [
      { range: '15-20', count: 0 },
      { range: '21-25', count: 0 },
      { range: '26-31', count: 0 },
      { range: '31-35', count: 0 },
      { range: '36+', count: 0 },
    ];

    users.forEach((user) => {
      const age = user.age;
      if (age >= 15 && age <= 20) {
        ageRanges[0].count++;
      } else if (age >= 21 && age <= 25) {
        ageRanges[1].count++;
      } else if (age >= 26 && age <= 31) {
        ageRanges[2].count++;
      } else if (age >= 31 && age <= 35) {
        ageRanges[3].count++;
      } else if (age >= 36) {
        ageRanges[4].count++;
      }
    });

    const totalUsers = users.length;
    const percentages = ageRanges.map((range) => ({
      range: range.range,
      percentage: ((range.count / totalUsers) * 100).toFixed(2),
    }));

    return percentages;
  }

  async dailyUpdateBodyInfo(id: string, data: BodyInfo) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        bodyInfo: {
          create: {
            foodType: data.foodType,
            gymAddress: data.gymAddress,
            gymTime: data.gymTime,
            bodyType: data.bodyType,
            height: data.height,
            weight: data.weight,
            diabetesNum: data.diabetesNum,
          },
        },
      },
    });
    return updatedUser;
  }

  async deleteCheckup(userId: string, checkupId: string) {
    if (!userId || !checkupId) {
      throw new Error('User ID and Checkup ID are required');
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { checkups: true },
      });

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const checkupExists = user.checkups.some(
        (checkup) => checkup.id === checkupId,
      );

      if (!checkupExists) {
        throw new Error(`Checkup with ID ${checkupId} not found for this user`);
      }

      const deletedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          checkups: {
            delete: {
              id: checkupId,
            },
          },
        },
      });

      return deletedUser;
    } catch (error) {
      // Catch and rethrow errors with more details if needed
      throw new Error(`Failed to delete checkup: ${error.message}`);
    }
  }

  async addNewCheckup(userId: string, checkup: CheckupDto) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const newCheckup = await this.prisma.user.update({
      where: { id: userId },
      data: {
        checkups: {
          create: {
            checkupName: checkup.checkupName,
            checkupDate: checkup.checkupDate,
            checkupPercentage: checkup.checkupPercentage,
            checkupAverage: checkup.checkupAverage,
            checkupDescription: checkup.checkupDescription,
            checkupImageName: checkup.checkupImageName,
          },
        },
      },
    });
    return newCheckup;
  }

  async editCheckup(userId: string, checkupId: string, checkup: CheckupDto) {
    if (!userId || !checkupId) {
      throw new Error('User ID and Checkup ID are required');
    }
    console.log('Checkup', checkup);
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        checkups: {
          update: {
            where: { id: checkupId },
            data: {
              checkupName: checkup.checkupName,
              checkupDate: checkup.checkupDate,
              checkupPercentage: checkup.checkupPercentage,
              checkupAverage: checkup.checkupAverage,
              checkupDescription: checkup.checkupDescription,
              checkupImageName: checkup.checkupImageName,
            },
          },
        },
      },
      include: {
        checkups: {
          where: {
            id: checkupId,
          },
        },
      },
    });
    return updatedUser;
  }
}
