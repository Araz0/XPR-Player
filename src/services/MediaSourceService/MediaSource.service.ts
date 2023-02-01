export class MediaSourceService {
  private clipIndex = 0
  // private vidClips = ['60fps_Tester.mp4', 'Audio Video Sync Test 60 FPS.mp4']
  private vidClips = [
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm.160p.webm',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Schlossbergbahn.webm/Schlossbergbahn.webm.160p.webm',
    'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.webm',
  ]
  private sourceBuffer: any
  private clipsToAppend: any
  private mediaSource: any
  private videoElement: any
  // private mimeCodec = `video/mp4; codecs="avc1.42E01E, mp4a.40.2"`
  private mimeCodec = `video/webm; codecs="vp8,vorbis"`

  constructor() {
    if (MediaSource.isTypeSupported(this.mimeCodec)) {
      // eslint-disable-next-line no-console
      console.log('✅ The video format is supported by the browser.')
    } else {
      // eslint-disable-next-line no-console
      console.log('❌ The video format is not supported by the browser.')
    }
  }

  public createblob = async (videoElementId: string) => {
    this.videoElement = document.getElementById(
      videoElementId
    ) as HTMLVideoElement
    if (!this.videoElement) return

    // Get video clips as buffers
    this.clipsToAppend = await Promise.all(
      this.vidClips.map(async (vidUrl) => {
        return (await fetch(vidUrl)).arrayBuffer()
      })
    )

    // Normal setup, with MediaSource, Object URL, and prepped SourceBuffer
    //
    this.mediaSource = new MediaSource()
    this.videoElement.src = URL.createObjectURL(this.mediaSource)
    // mode = sequence
    this.sourceBuffer = (await this.addSourceBufferWhenOpen(
      this.mediaSource,
      this.mimeCodec,
      'sequence'
    )) as any

    /**
     * Pointer to last vid appended out of source list
     */

    // sourceBuffer.onupdateend = () => {

    // }

    // Debug Info
    // eslint-disable-next-line no-console
    console.log(this.sourceBuffer)
    // eslint-disable-next-line no-console
    console.log(this.mediaSource)
    // eslint-disable-next-line no-console
    console.log(this.videoElement)
    // if (!this.sourceBuffer) return
    // This will kick off event listener chain above
    this.sourceBuffer.appendBuffer(this.clipsToAppend[this.clipIndex])
  }

  /**
   * Adds (and returns once ready) a SourceBuffer to a MediaSource
   * @param {MediaSource} mediaSource
   * @param {string} mimeStr Example: `video/webm; codecs="vp9,opus"` || 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
   * @param {'sequence' | 'segments'} [mode]
   * @returns {Promise<SourceBuffer>}
   */
  private addSourceBufferWhenOpen = (
    mediaSource: any,
    mimeStr: any,
    mode = 'segments'
  ) => {
    return new Promise((res, rej) => {
      const getSourceBuffer = () => {
        try {
          const sourceBuffer = mediaSource.addSourceBuffer(mimeStr)
          sourceBuffer.mode = mode
          res(sourceBuffer)
        } catch (e) {
          rej(e)
        }
      }
      if (mediaSource.readyState === 'open') {
        getSourceBuffer()
      } else {
        mediaSource.addEventListener('sourceopen', getSourceBuffer)
      }
    })
  }

  public pushFile = () => {
    if (this.clipIndex < this.vidClips.length - 1) {
      this.clipIndex++
      this.sourceBuffer.appendBuffer(this.clipsToAppend[this.clipIndex])
    } else {
      // Done!
      this.mediaSource.endOfStream()
      this.videoElement.play()
    }
  }
}
