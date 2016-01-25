interface TrackDescription {
    title: string;
    length: number;
    passed: number;
}

export class Track implements TrackDescription {

    public title: string;
    public length: number;
    public passed: number;

    public constructor(trackDescription: TrackDescription) {
        this.title = trackDescription.title;
        this.length = trackDescription.length;
        this.passed = trackDescription.passed;
    }

    public init() {
        this.passed = 0;
    }

    public get remaining(): number {
        return this.length - this.passed;
    }
}

export class PlayList {

    private currentTrackIndex: number = 0;
    public tracks: Track[] = [];

    public get currentTrack(): Track {
        return this.tracks[this.currentTrackIndex];
    }

    public next(): this {
        if (this.currentTrackIndex < this.tracks.length - 1) {
            this.currentTrackIndex++;
        }
        return this;
    }

    public prev(): this {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
        }
        return this;
    }

    public get length(): number {
        return this.tracks.reduce((sum, track) => sum + track.length, 0);
    }

    public get remaining(): number {
        return this.tracks.reduce((sum, track) => sum + track.remaining, 0);
    }
}

function PlayListGenerator(oneLoopTrack: Track[], loopCounter: number): PlayList {
    var ret = new PlayList();
    for (let i = 0; i < loopCounter; i++) {
        for (let j = 0; j < oneLoopTrack.length; j++) {
            ret.tracks.push(new Track(oneLoopTrack[j]));
        }
    }
    return ret;
}

export enum EngineState {
    Stopped,
    Paused,
    Running
}

export class Engine {
    private playList: PlayList;
}