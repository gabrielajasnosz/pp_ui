export interface FileResponse {
    success: boolean
    status: number
    id: string
    key: string
    path: string
    nodeType: string
    name: string
    title: string
    description: string
    size: number
    link: string
    private: boolean
    expires: string
    downloads: number
    maxDownloads: number
    autoDelete: boolean
    planId: number
    screeningStatus: string
    mimeType: string
    created: string
    modified: string
}
