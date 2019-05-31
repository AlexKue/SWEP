require 'test_helper'

class UserTest < ActiveSupport::TestCase
    def setup
        @user = User.new(name: "Max Mustermann",
                        email: "Mustermann@example.com",
                        password: "password",
                        password_confirmation: "password")
    end

    test "should be valid" do
        assert @user.valid?
    end

    test "should not allow empty names" do
        @user.name = ""
        assert_not @user.valid?
    end

    test "should not allow too long names" do
        @user.name = "a" * 51
        assert_not @user.valid?
    end

    test "should not allow empty email" do
        @user.email = "    "
        assert_not @user.valid?
    end

    test "should not allow too long email" do
        @user.email = "a" * 300 + "@example.com"
        assert_not @user.valid?
    end

    test "should not allow invalid emails" do
        emails = ["example", "example@mail", "mail.de", "example @test.de", "test@test.", "test@test. de"]
        emails.each do |mail|
            @user.email = "example@example"
            assert_not @user.valid?
        end
    end

    test "should allow valid emails" do
        emails = ["ExAmPlE@MaIL.de", "alexander-michael.kuehnle@test-mail.de", "A_LE-X+XD@ab.c.de"]
        emails.each do |mail|
            @user.email = mail
            assert @user.valid?
        end
    end

    test "should not allow blank passwords" do
        @user.password = " " * 8
        assert_not @user.valid?
    end

    test "should not allow too short passwords" do
        @user.password = "abc"
        @user.password_confirmation = "abc" 
        assert_not @user.valid?
    end
end
