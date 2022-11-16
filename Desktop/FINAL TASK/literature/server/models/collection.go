package models

type Collection struct {
	ID           int                `json:"id" gorm:"primary_key:auto_increment"`
	UserID       int                `json:"user_id" gorm:"int"`
	User         UserResponse       `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	LiteratureID int                `json:"literature_id" gorm:"int"`
	Literature   LiteratureResponse `json:"literature"`
}

type CollectionResponse struct {
	ID           int                `json:"id"`
	User         UserResponse       `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserID       int                `json:"user_id" gorm:"int"`
	LiteratureID int                `json:"literature_id"`
	Literature   LiteratureResponse `json:"literature"`
}
