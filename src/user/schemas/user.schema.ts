import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class User extends Document {
    @Prop({required: true})
    name: string;

    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    password: string;  // Should be a hash
  
    @Prop({ default: [] })
    wishlist: string[];  // Array of product IDs
  
    @Prop({ default: [] })
    cart: string[];  // Same as wishlist, an array of product IDs
}

export const UserSchema = SchemaFactory.createForClass(User);