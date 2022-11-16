package literaturedto

type LiteratureResponse struct {
	Title           string `json:"name" form:"name" gorm:"type: varchar(255)"`
	PublicationDate string `json:"desc" gorm:"type:text" form:"desc"`
	Pages           string `json:"pages" form:"pages" gorm:"type: varchar(255)"`
	ISBN            string `json:"isbn" form:"isbn" gorm:"type: varchar(255)"`
	Author          string `json:"author" form:"author" gorm:"type: varchar(255)"`
	Status          string `json:"status" form:"status" gorm:"type: varchar(255)"`
}
