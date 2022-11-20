import { programType } from './types'

export const program: programType = {
  title: 'Program Title',
  screens: [
    {
      id: 1,
      title: 'screen1',
      sequences: [
        {
          id: 1,
          name: 'the intro',
          videoSrc: '/media/102.mp4',
        },
        {
          id: 2,
          name: 'what now',
          options: [
            { videoSrc: '/media/102.mp4' },
            { videoSrc: '/media/103.mp4', isDefault: true },
          ],
        },
      ],
    },
  ],
}

// incase other types of testing are needed:
// const url1 = 'https://media.w3.org/2010/05/bunny/movie.mp4'
// const url2 = 'https://media.w3.org/2010/05/sintel/trailer.mp4'
