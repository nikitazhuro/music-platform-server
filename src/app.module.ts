import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './schemas/album.schema';
import { AlbumsTracks } from './schemas/albums-tracks.schema';
import { Comment } from './schemas/comment.schema';
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
      models: [Track, Comment, Album, AlbumsTracks],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
