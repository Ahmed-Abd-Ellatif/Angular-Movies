import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GenresDto,
  Movie,
  MovieCredits,
  MovieDto,
  MovieImages,
  MovieVideoDto,
} from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3/';
  apiKey: string = 'd8402b4180d53e51daf17fb75d7b5f4b';
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}movie/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }
  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}movie/${id}?api_key=${this.apiKey}`
    );
  }

  getMoviesVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(
        `${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`
    );
  }
  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  searchMovies(page: number, serachValue?: string) {
    const uri = serachValue ? 'search/movie' : 'movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${serachValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDto>(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
