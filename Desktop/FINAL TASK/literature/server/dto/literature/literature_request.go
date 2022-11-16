package literaturedto

type LiteratureRequest struct {
	Title           string `json:"name" form:"name" gorm:"type: varchar(255)" validate:"required"`
	PublicationDate string `json:"desc" gorm:"type:text" form:"desc" validate:"required"`
	Pages           string `json:"pages" form:"pages" gorm:"type: varchar(255)" validate:"required"`
	ISBN            string `json:"isbn" form:"isbn" gorm:"type: varchar(255)" validate:"required"`
	Author          string `json:"author" form:"author" gorm:"type: varchar(255)" validate:"required"`
	Status          string `json:"status" form:"status" gorm:"type: varchar(255)" validate:"required"`
}

type UpdateLiteratureRequest struct {
	Status string `json:"status"`
}
