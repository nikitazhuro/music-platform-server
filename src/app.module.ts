import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './schemas/track.schema';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'musicPlatform',
      models: [Track],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
