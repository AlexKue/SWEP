class User < ApplicationRecord
  has_many :exercise_solvers
  has_many :exercises, through: :exercise_solvers
  before_save :downcase_email
  validates :name,  presence: true,
                    length: { maximum: 50}
  

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
                    length: { maximum: 255 },
                    uniqueness: { case_sensitive: false },
                    format: { with: VALID_EMAIL_REGEX }
  
  validates :password,  presence: true,
                        length: { minimum: 8}
  has_secure_password                      
  
  def as_json(options={})
    super(except: [:password_digest])
  end
  
  private
  
    # Downcase emails
    def downcase_email
      self.email = email.downcase
    end

    # Calculate digest (for use in fixtures)
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                    BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end
end
