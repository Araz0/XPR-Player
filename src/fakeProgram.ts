import { ProgramType } from './types'

export const program: ProgramType = {
  title: 'Program Title',
  segments: [
    {
      id: '87897156',
      title: 'Intro',
      isIntro: true,
      screens: [
        {
          title: 'screen1',
          mediaSrc: '/60fps_Tester.mp4',
        },
        {
          title: 'screen2',
          mediaSrc: '/videocodec.mp4',
        },
      ],
      nextSegmentIds: ['65465465', '65465465465', '654654'],
    },
    {
      id: '65465465',
      title: '#1 sequence',
      screens: [
        {
          title: 'screen1',
          mediaSrc: '/60fps_Tester.mp4',
        },
        {
          title: 'screen2',
          mediaSrc: '/videocodec.mp4',
        },
      ],
    },
    {
      id: '65465465465',
      title: '#2 sequence',
      screens: [
        {
          title: 'screen2',
          mediaSrc: '/videocodec.mp4',
        },
        {
          title: 'screen1',
          mediaSrc: '/60fps_Tester.mp4',
        },
      ],
    },
    {
      id: '654654',
      title: 'doubled',
      screens: [
        {
          title: 'screen1',
          mediaSrc: '/60fps_Tester.mp4',
        },
        {
          title: 'screen2',
          mediaSrc: '/videocodec.mp4',
        },
      ],
      nextSegmentIds: ['65465465', '65465465465'],
    },
  ],
}

// incase other types of testing are needed:
// https://www.w3schools.com/html/mov_bbb.mp4
// const url1 = 'https://media.w3.org/2010/05/bunny/movie.mp4'
// const url2 = 'https://media.w3.org/2010/05/sintel/trailer.mp4'
