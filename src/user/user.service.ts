import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findOrCreateGoogleUser(profile: any): Promise<User> {
    let user = await this.userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = new this.userModel({
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      await user.save();
    }
    return user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = new this.userModel({ email, password });
    return user.save();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.userModel.findOne({userId})
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

}

