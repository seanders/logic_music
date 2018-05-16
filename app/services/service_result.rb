# Generic interface for the result of a service
class ServiceResult
  attr_reader :success, :data, :errors

  def initialize(success:, data: nil, errors: nil)
    @success = success
    @data = data
    @errors = errors
  end

  def success?
    success == true
  end
end
