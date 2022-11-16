package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type CollectionRepository interface {
	CreateCollection(Collection models.Collection) (models.Collection, error)
	FindCollection() ([]models.Collection, error)
	GetCollection(ID int) (models.Collection, error)
	UpdateCollection(Collection models.Collection) (models.Collection, error)
	DeleteCollection(Collection models.Collection) (models.Collection, error)
	GetCollectionByUser(ID int) ([]models.Collection, error)
	GetCollectionByLiterature(Lit int) ([]models.Collection, error)
}

func RepositoryCollection(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateCollection(collection models.Collection) (models.Collection, error) {
	err := r.db.Preload("User").Preload("Literature.User").Create(&collection).Error
	return collection, err
}

func (r *repository) FindCollection() ([]models.Collection, error) {
	var collection []models.Collection
	err := r.db.Preload("User").Preload("Literature.User").Find(&collection).Error
	return collection, err
}

func (r *repository) GetCollection(ID int) (models.Collection, error) {
	var collection models.Collection
	err := r.db.Preload("User").Preload("Literature.User").First(&collection, ID).Error

	return collection, err
}

func (r *repository) UpdateCollection(collection models.Collection) (models.Collection, error) {
	err := r.db.Preload("User").Preload("Literature.User").Save(&collection).Error

	return collection, err
}

func (r *repository) DeleteCollection(collection models.Collection) (models.Collection, error) {
	err := r.db.Preload("User").Preload("Literature.User").Delete(&collection).Error

	return collection, err
}

func (r *repository) GetCollectionByUser(ID int) ([]models.Collection, error) {
	var collection []models.Collection
	err := r.db.Where("user_id=?", ID).Preload("User").Preload("Literature").Preload("Literature.User").Find(&collection).Error

	return collection, err
}

func (r *repository) GetCollectionByLiterature(Lit int) ([]models.Collection, error) {
	var collection []models.Collection
	err := r.db.Where("literature_id=?", Lit).Preload("User").Preload("Literature").Preload("Literature.User").Find(&collection).Error
	return collection, err
}
