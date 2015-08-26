post '/signin' do
  user = User.find_by(name: params[:user][:name])
  if user && user.authenticate(params[:user][:password])
    { id: user.id, name: user.name }.to_json
  else
    status 401
  end
end

post '/signup' do
  invalid = User.signup_validation(params[:user])
  if invalid
    status 401
    body invalid
  else
    user = User.create(params[:user])
    { id: user.id, name: user.name }.to_json
  end
end
