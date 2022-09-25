import { getInput, setFailed, setOutput } from '@actions/core';
import cp from 'node:child_process';
import { listTags, writeYAML } from './util';

try {
	const form = getInput('form', { trimWhitespace: true, required: true });
	const packageName = getInput('package', {
		trimWhitespace: true,
		required: true,
	});
	const registry = getInput('registry', {
		trimWhitespace: true,
		required: true,
	});
	const order = getInput('order', { trimWhitespace: true, required: true });
	const limitTo =
		Math.abs(Number(getInput('limit_to', { trimWhitespace: true }))) ||
		undefined;
	const dropdownId = getInput('dropdown', {
		trimWhitespace: true,
		required: true,
	});
	const commitMessage = getInput('commit_message', {
		trimWhitespace: true,
		required: true,
	});
	const tags =
		getInput('tags', { trimWhitespace: true }) ||
		listTags(registry, packageName, order, limitTo);
	setOutput('tags', tags);
	writeYAML(form, dropdownId, tags);
	// cp.execSync(`git config --global user.name github-actions[bot]`);
	// cp.execSync(
	// 	`git config --global user.email github-actions[bot]@users.noreply.github.com`,
	// );
	// cp.execSync(`git add ${form}`);
	// cp.execSync(`git commit -m "${commitMessage}"`);
	// cp.execSync(`git push`);
} catch (error) {
	console.log(error);
	setFailed(error);
}
