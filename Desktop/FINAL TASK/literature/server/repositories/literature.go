package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type LiteratureRepository interface {
	FindLiteratures() ([]models.Literature, error)
	GetLiterature(ID int) (models.Literature, error)
	GetLiteratureByUser(ID int) ([]models.Literature, error)
	CreateLiterature(literature models.Literature) (models.Literature, error)
	UpdateLiterature(literature models.Literature, ID int) (models.Literature, error)
	FindLiteraturesApprove() ([]models.Literature, error)
}

func RepositoryLiterature(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindLiteratures() ([]models.Literature, error) {
	var literatures []models.Literature
	err := r.db.Preload("User").Find(&literatures).Error

	return literatures, err
}

func (r *repository) GetLiterature(ID int) (models.Literature, error) {
	var literature models.Literature
	err := r.db.Preload("User").First(&literature, ID).Error

	return literature, err
}

func (r *repository) CreateLiterature(literature models.Literature) (models.Literature, error) {
	err := r.db.Create(&literature).Error

	return literature, err
}

func (r *repository) GetLiteratureByUser(ID int) ([]models.Literature, error) {
	var literature []models.Literature
	err := r.db.Where("user_id=?", ID).Preload("User").Find(&literature).Error

	return literature, err
}

func (r *repository) UpdateLiterature(literature models.Literature, ID int) (models.Literature, error) {
	err := r.db.Model(&literature).Where("id=?", ID).Updates(&literature).Error

	return literature, err
}

func (r *repository) FindLiteraturesApprove() ([]models.Literature, error) {
	var literatures []models.Literature
	err := r.db.Where("status='approve'").Find(&literatures).Error

	return literatures, err
}
