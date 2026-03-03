export interface ResourceDTO {
    name:        string;
    description: string;
    url:         string;
    category:    string[];
    date:        string;
    image:       string;
    nameColor:   string;
    headerColor: string;
}

export interface Resource extends Omit<ResourceDTO, 'date'> {
    date: Date;
}