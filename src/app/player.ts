interface TrackDescription {
    title: string;
    length: number;
}

export class Track implements TrackDescription {

    public title: string;
    public length: number;
    public passed: number;

    public constructor(trackDescription: TrackDescription) {
        this.title = trackDescription.title;
        this.length = trackDescription.length;
        this.moveToStart();
    }

    public get remaining(): number {
        return this.length - this.passed;
    }

    public moveToStart() {
        this.passed = 0;
    }

    public moveToEnd() {
        this.passed = this.length;
    }

    public addTime(ms: number): number {
        this.passed += ms;
        var extra = this.passed - this.length;
        if (this.passed > this.length) {
            this.passed = this.length;
        }
        return extra;
    }
}

export class PlayList {

    private currentTrackIndex: number = 0;
    public tracks: Track[] = [];

    public constructor(oneLoopTrack: Track[], loopCounter: number) {
        for (let i = 0; i < loopCounter; i++) {
            for (let j = 0; j < oneLoopTrack.length; j++) {
                this.tracks.push(new Track(oneLoopTrack[j]));
            }
        }
    }

    public get currentTrack(): Track {
        return this.tracks[this.currentTrackIndex];
    }

    public next(): this {
        this.currentTrack.moveToEnd();
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

    public isEmpty() {
        return this.tracks.length === 0;
    }

    public addTime(ms: number) {
        if (this.isEmpty()) {
            throw 'Cannot play an empty playlist';
        }
        do {
            var extra = this.currentTrack.addTime(ms);
            if (extra > 0) {
                ms = extra;
                this.next();
            }
        } while (extra > 0);
    }
}

export enum EngineState {
    Stopped,
    Paused,
    Running
}

export class Engine {
    private playList: PlayList;
    private remainingTime: number;
    
    public tickListener:(ms: number) => void;
    
    public start() {
        setTimeout()
    }
}