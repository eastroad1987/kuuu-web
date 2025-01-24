export enum YNEnum {
  Y = "Y",
  N = "N",
}

export interface Board {
  board_name: string;
}

export interface SubBoard {
  board_name: string;
  anonymous_yn: YNEnum;
  title_yn: YNEnum;
  content_yn: YNEnum;
  thumbnail_yn: YNEnum;
  reference_place_yn: YNEnum;
  secret_yn: YNEnum;
  images_yn: YNEnum;
  attach_files_yn: YNEnum;
  comment_yn: YNEnum;
  view_cnt_yn: YNEnum;
}

export interface Post {
  id: number;
  created_at: Date;
  writer_id: number;
  writer_name: string;
  title: string;
  content: string;
  summary: string;
  thumbnail: string;
  reference_place: string;
  board_id: number;
}
