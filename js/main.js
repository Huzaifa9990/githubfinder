$(document).ready(function()
{
	$("#searchUser").on('keyup',function(e)
	{
		var username=this.value;
		$.ajax(
		{
			url:"https://api.github.com/users/"+username,
			type:'GET',
		})
		.done((response)=>
		{
			$.ajax({
				url:"https://api.github.com/users/"+username+"/repos",
				type:'GET'
			})
			.done((repos)=>
			{
				$("#repos").html('');
				$.each(repos,function(index,repo)
				{
				$("#repos").append(`
				<div class="well">
				<div class="row">
				<div class="col-md-7">
				<strong>${repo.name}</strong>
				</div>
				</div>
				</div>
				`);
				});
			})
			$("#profiles").html(`
			<div class="row">
			<div class="col-md-3">
			<img class="thumbnail avatar" src="${response.avatar_url}">
			<a class="btn btn-primary btn-block" href="${response.html_url}">View Profile</a>
			</div>
			<div class="col-md-9">
			<span class="label label-default">Public Repos: ${response.public_repos}</span>
			<span class="label label-primary">Public Gists: ${response.public_gists}</span>
			<span class="label label-success">Public Followers: ${response.followers}</span>
			<span class="label label-info">Public Following: ${response.following}</span>
			<br>
			<br>
			<ul class="list-group">
				<li class="list-group-item">Company: ${response.company}</li>
				<li class="list-group-item">Website/Blog: ${response.blog}</li>
				<li class="list-group-item">Location: ${response.location}</li>
				<li class="list-group-item">Member since: ${response.created_at}</li>
			</ul>
			</div>
			</div>
			`)		
		})
	});
});


