package authdto

type LoginResponse struct {
	ID       int    `gorm:"type: int" json:"id"`
	FullName string `gorm:"type: varchar(255)" json:"fullName"`
	Email    string `gorm:"type: varchar(255)" json:"-"`
	Password string `gorm:"type: varchar(255)" json:"-"`
	Role     string `gorm:"type: varchar(255)" json:"role"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	ID       int    `gorm:"type: int" json:"id"`
	FullName string `gorm:"type: varchar(255)" json:"name"`
	Email    string `gorm:"type: varchar(255)" json:"-"`
	Role     string `gorm:"type: varchar(255)" json:"role"`
}
