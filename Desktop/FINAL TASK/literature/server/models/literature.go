package models

type Literature struct {
	ID              int          `json:"id" gorm:"primary_key:auto_increment"`
	Title           string       `json:"title" form:"title" gorm:"type: varchar(255)"`
	PublicationDate string       `json:"publication_date" form:"publication_date" gorm:"type: varchar(255)"`
	Pages           string       `json:"pages" form:"pages" gorm:"type: varchar(255)"`
	ISBN            string       `json:"isbn" form:"isbn" gorm:"type: varchar(255)"`
	Author          string       `json:"author" form:"author" gorm:"type: varchar(255)"`
	File            string       `json:"file" form:"file" gorm:"type: varchar(255)"`
	Status          string       `json:"status" form:"status" gorm:"type: varchar(255)"`
	UserID          int          `json:"user_id" form:"user_id"`
	User            UserResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type LiteratureResponse struct {
	ID              int          `json:"id"`
	Title           string       `json:"title"`
	PublicationDate string       `json:"publication_date"`
	Pages           string       `json:"pages"`
	ISBN            string       `json:"isbn"`
	Author          string       `json:"author"`
	File            string       `json:"file"`
	Status          string       `json:"status"`
	UserID          int          `json:"user_id"`
	User            UserResponse `json:"user"`
}

func (LiteratureResponse) TableName() string {
	return "literatures"
}
