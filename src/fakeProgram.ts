import { ProgramType } from './types'

export const program: ProgramType = {
  id: 0,
  title: 'Program Title',
  amountOfScreens: 2,
  media: [
    {
      id: 87897156,
      title: 'Intro',
      description:
        'In the example, we use the useState hook to create a state variable',
      screens: [
        {
          id: 65464,
          title: 'screen1',
          mediaSrc: '/60fps_Tester.mp4',
        },
        {
          id: 65564,
          title: 'screen2',
          mediaSrc: '/Audio Video Sync Test 60 FPS.mp4',
        },
      ],
    },
  ],
  segments: [
    {
      id: 87897156,
      isIntro: true,
      nextSegmentIds: [65465465, 65465465465, 654654],
      mediaId: 87897156,
    },
    {
      id: 65465465,
      mediaId: 87897156,
    },
    {
      id: 65465465465,
      mediaId: 87897156,
    },
    {
      id: 654654,
      mediaId: 87897156,
      nextSegmentIds: [65465465, 65465465465],
    },
  ],
}

// incase other types of testing are needed:
// https://www.w3schools.com/html/mov_bbb.mp4
// const url1 = 'https://media.w3.org/2010/05/bunny/movie.mp4'
// const url2 = 'https://media.w3.org/2010/05/sintel/trailer.mp4'
