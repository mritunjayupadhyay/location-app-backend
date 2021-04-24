import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LocationsModule } from './modules/locations/locations.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://mj:mritunjay4321@databaseone.ivhjv.gcp.mongodb.net/mj-db?retryWrites=true&w=majority',
    ),
    AuthModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
