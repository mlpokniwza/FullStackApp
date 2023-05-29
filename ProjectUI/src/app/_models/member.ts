export interface Member {
    id: number
    username: string
    photosUrl: string
    age: number
    knownAs: string
    created: Date
    lastActive: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
}

export interface Photo {
    id: number
    url: string
    isMain: boolean
}