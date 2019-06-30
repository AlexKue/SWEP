require 'test_helper'

class ExerciseSolverTest < ActiveSupport::TestCase
  def setup
    @relationship = ExerciseSolver.new(user_id: users(:Alex).id, exercise_id: exercises(:one).id, query: "test")
  end

  test "should be valid" do
    assert @relationship.valid?
  end

  test "should require user_id" do
    @relationship.user_id = nil
    assert_not @relationship.valid?
    @relationship.user_id = users(:Alex).id
    assert @relationship.valid?
  end

  test "should require exercise_id" do
    @relationship.exercise_id = nil
    assert_not @relationship.valid?
    @relationship.exercise_id = exercises(:one).id
    assert @relationship.valid?
  end
end
