import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './App.css';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import FolderIcon from '@mui/icons-material/Folder';
import OneDriveFilesTable from './Sid';
import Actions from './Actions';
import Divider from '@mui/material/Divider';
import browsevideo from './browse.mp4'
import TreeViewComponent from "./TreeViewComponent"
import Stack from '@mui/material/Stack';
import Tree from './Tree';

function Browse() {

    const location = useLocation();
    const [clientId] = useState(location.state.id);
    const [clientName] = useState(location.state.clientName);
    const [path,setPath]=useState([]);
    const [rootData,setRootData]=useState([]);
    const rootNode={
      name_s:"Users",
      itemType_i:1,
      userId_s:"",
      id:clientId,
      children :[],
      parentPath:[],
      isexpand:true
    } 
    const root=[{
      name_s:"Users",
      itemType_i:1,
      userId_s:"",
      id:clientId,
      children :rootData.map(child=>child.parentPath=[rootNode]),
      parentPath:[],
      isexpand:true
    }];
    
    
    const azuresvg = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 256 242"><defs><linearGradient id="logosMicrosoftAzure0" x1="58.972%" x2="37.191%" y1="7.411%" y2="103.762%"><stop offset="0%" stop-color="#114A8B"/><stop offset="100%" stop-color="#0669BC"/></linearGradient><linearGradient id="logosMicrosoftAzure1" x1="59.719%" x2="52.691%" y1="52.313%" y2="54.864%"><stop offset="0%" stop-opacity=".3"/><stop offset="7.1%" stop-opacity=".2"/><stop offset="32.1%" stop-opacity=".1"/><stop offset="62.3%" stop-opacity=".05"/><stop offset="100%" stop-opacity="0"/></linearGradient><linearGradient id="logosMicrosoftAzure2" x1="37.279%" x2="62.473%" y1="4.6%" y2="99.979%"><stop offset="0%" stop-color="#3CCBF4"/><stop offset="100%" stop-color="#2892DF"/></linearGradient></defs><path fill="url(#logosMicrosoftAzure0)" d="M85.343.003h75.753L82.457 233a12.078 12.078 0 0 1-11.442 8.216H12.06A12.06 12.06 0 0 1 .633 225.303L73.898 8.219A12.08 12.08 0 0 1 85.343 0z"/><path fill="#0078D4" d="M195.423 156.282H75.297a5.56 5.56 0 0 0-3.796 9.627l77.19 72.047a12.138 12.138 0 0 0 8.28 3.26h68.02z"/><path fill="url(#logosMicrosoftAzure1)" d="M85.343.003a11.98 11.98 0 0 0-11.471 8.376L.723 225.105a12.045 12.045 0 0 0 11.37 16.112h60.475a12.926 12.926 0 0 0 9.921-8.437l14.588-42.991l52.105 48.6a12.327 12.327 0 0 0 7.757 2.828h67.766l-29.721-84.935l-86.643.02L161.37.003z"/><path fill="url(#logosMicrosoftAzure2)" d="M182.098 8.207A12.06 12.06 0 0 0 170.67.003H86.245c5.175 0 9.773 3.301 11.428 8.204L170.94 225.3a12.062 12.062 0 0 1-11.428 15.92h84.429a12.062 12.062 0 0 0 11.425-15.92z"/></svg>

    const FILE_ICONS = {
        user:<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
        </svg>,
        folder2: '📁',
        folder:<FolderIcon style={{ fill: '#ebb434',fontSize:'30px' }}/>,
        doc: <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z"/></svg>,
        xls: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"></path><path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"></path><path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"></path><path fill="#17472a" d="M14 24.005H29V33.055H14z"></path><g><path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"></path><path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"></path><path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"></path><path fill="#129652" d="M29 24.005H44V33.055H29z"></path></g><path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"></path><path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"></path>
        </svg>,
        ppt: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <defs><linearGradient id="52x_Ivfe9urrJo3bIH68aa_4w90yhLaR3jg_gr1" x1="33.5" x2="33.5" y1="-1.45" y2="60.31" data-name="ÐÐµÐ·ÑÐ¼ÑÐ½Ð½ÑÐ¹ Ð³ÑÐ°Ð´Ð¸ÐµÐ½Ñ 3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset=".03" stop-color="#fcca00"></stop><stop offset=".22" stop-color="#f3a400"></stop><stop offset=".41" stop-color="#ec8601"></stop><stop offset=".59" stop-color="#e77101"></stop><stop offset=".77" stop-color="#e46401"></stop><stop offset=".94" stop-color="#e36001"></stop></linearGradient><linearGradient id="52x_Ivfe9urrJo3bIH68ab_4w90yhLaR3jg_gr2" x1="6" x2="27" y1="24" y2="24" data-name="ÐÐµÐ·ÑÐ¼ÑÐ½Ð½ÑÐ¹ Ð³ÑÐ°Ð´Ð¸ÐµÐ½Ñ 16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".44" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient></defs><path fill="url(#52x_Ivfe9urrJo3bIH68aa_4w90yhLaR3jg_gr1)" d="m41,10h-16v28h16c.55,0,1-.45,1-1V11c0-.55-.45-1-1-1Z"></path><path fill="#fbe9e7" d="m24,29h14v2h-14v-2Zm0,4h14v2h-14v-2Zm6-18c-3.31,0-6,2.69-6,6s2.69,6,6,6,6-2.69,6-6h-6v-6Z"></path><path fill="#fbe9e7" d="m32,13v6h6c0-3.31-2.69-6-6-6Z"></path><path fill="url(#52x_Ivfe9urrJo3bIH68ab_4w90yhLaR3jg_gr2)" d="m27,42l-21-4V10l21-4v36Z"></path><path fill="#fff" d="m16.83,17h-4.83v14h3v-4.82h1.55c1.66,0,2.98-.44,3.97-1.3.99-.87,1.48-2.01,1.48-3.41,0-2.97-1.72-4.46-5.17-4.46Zm-.53,6.78h-1.29v-4.36h1.29c1.64,0,2.46.72,2.46,2.16,0,1.47-.82,2.21-2.46,2.21Z"></path>
        </svg>,                    
        pdf: <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/></svg>,            
        py:<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
        <linearGradient id="goqfu1ZNmEnUrQDJEQ1bUa_l75OEUJkPAk4_gr1" x1="10.458" x2="26.314" y1="12.972" y2="26.277" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#26abe7"></stop><stop offset="1" stop-color="#086dbf"></stop></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUa_l75OEUJkPAk4_gr1)" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2 H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104 c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672 C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498 c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUb_l75OEUJkPAk4_gr2" x1="35.334" x2="23.517" y1="37.911" y2="21.034" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feb705"></stop><stop offset="1" stop-color="#ffda1c"></stop></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUb_l75OEUJkPAk4_gr2)" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2 h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104 c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672 C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498 c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
        </svg>,
        exe:<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
        <linearGradient id="goqfu1ZNmEnUrQDJEQ1bUa_l75OEUJkPAk4_gr1" x1="10.458" x2="26.314" y1="12.972" y2="26.277" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#26abe7"></stop><stop offset="1" stop-color="#086dbf"></stop></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUa_l75OEUJkPAk4_gr1)" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2 H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104 c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672 C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498 c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><linearGradient id="goqfu1ZNmEnUrQDJEQ1bUb_l75OEUJkPAk4_gr2" x1="35.334" x2="23.517" y1="37.911" y2="21.034" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#feb705"></stop><stop offset="1" stop-color="#ffda1c"></stop></linearGradient><path fill="url(#goqfu1ZNmEnUrQDJEQ1bUb_l75OEUJkPAk4_gr2)" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2 h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104 c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672 C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498 c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
        </svg>,
        html:'🌐' ,
        zip:<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 384 512"><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16h48v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm48 112c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-8.8 0-16 7.2-16 16zm0 64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-8.8 0-16 7.2-16 16zm-6.3 71.8L82.1 335.9c-1.4 5.4-2.1 10.9-2.1 16.4c0 35.2 28.8 63.7 64 63.7s64-28.5 64-63.7c0-5.5-.7-11.1-2.1-16.4l-23.5-88.2c-3.7-14-16.4-23.8-30.9-23.8H136.6c-14.5 0-27.2 9.7-30.9 23.8zM128 336h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H128c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>,
        code:<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>,
        file2:'📄',
        file:<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#909090" d="m24.1 2.072l5.564 5.8v22.056H8.879V30h20.856V7.945z"/><path fill="#f4f4f4" d="M24.031 2H8.808v27.928h20.856V7.873z"/><path fill="#7a7b7c" d="M8.655 3.5h-6.39v6.827h20.1V3.5z"/><path fill="#dd2025" d="M22.472 10.211H2.395V3.379h20.077z"/><path fill="#464648" d="M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2.042 2.042 0 0 0 .647-.117a1.427 1.427 0 0 0 .493-.291a1.224 1.224 0 0 0 .335-.454a2.13 2.13 0 0 0 .105-.908a2.237 2.237 0 0 0-.114-.644a1.173 1.173 0 0 0-.687-.65a2.149 2.149 0 0 0-.409-.104a2.232 2.232 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.942.942 0 0 1-.524.114m3.671-2.306c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.677 2.677 0 0 0 1.028-.175a1.71 1.71 0 0 0 .68-.491a1.939 1.939 0 0 0 .373-.749a3.728 3.728 0 0 0 .114-.949a4.416 4.416 0 0 0-.087-1.127a1.777 1.777 0 0 0-.4-.733a1.63 1.63 0 0 0-.535-.4a2.413 2.413 0 0 0-.549-.178a1.282 1.282 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.062 1.062 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a2.926 2.926 0 0 1-.033.513a1.756 1.756 0 0 1-.169.5a1.13 1.13 0 0 1-.363.36a.673.673 0 0 1-.416.106m5.08-3.915H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892"/><path fill="#dd2025" d="M21.781 20.255s3.188-.578 3.188.511s-1.975.646-3.188-.511m-2.357.083a7.543 7.543 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14.216 14.216 0 0 0 1.658 2.252a13.033 13.033 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.787 10.787 0 0 1-.517 2.434a4.426 4.426 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444c-.003.001-1.576 3.056-2.6 2.444M25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14.228 14.228 0 0 0-2.453.173a12.542 12.542 0 0 1-2.012-2.655a11.76 11.76 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.309 9.309 0 0 0 .665 2.338s-.425 1.323-.987 2.639s-.946 2.006-.946 2.006a9.622 9.622 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945c.374.508 1.683.623 2.853-.91a22.549 22.549 0 0 0 1.7-2.492s1.784-.489 2.339-.623s1.226-.24 1.226-.24s1.629 1.639 3.2 1.581s1.495-.939 1.485-1.035"/><path fill="#909090" d="M23.954 2.077V7.95h5.633z"/><path fill="#f4f4f4" d="M24.031 2v5.873h5.633z"/><path fill="#fff" d="M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2.042 2.042 0 0 0 .647-.117a1.428 1.428 0 0 0 .493-.291a1.224 1.224 0 0 0 .332-.454a2.13 2.13 0 0 0 .105-.908a2.237 2.237 0 0 0-.114-.644a1.173 1.173 0 0 0-.687-.65a2.149 2.149 0 0 0-.411-.105a2.232 2.232 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181a.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.942.942 0 0 1-.524.114m3.67-2.306c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.677 2.677 0 0 0 1.028-.175a1.71 1.71 0 0 0 .68-.491a1.939 1.939 0 0 0 .373-.749a3.728 3.728 0 0 0 .114-.949a4.416 4.416 0 0 0-.087-1.127a1.777 1.777 0 0 0-.4-.733a1.63 1.63 0 0 0-.535-.4a2.413 2.413 0 0 0-.549-.178a1.282 1.282 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.062 1.062 0 0 1 .6.107a1.2 1.2 0 0 1 .324.4a1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a2.926 2.926 0 0 1-.033.513a1.756 1.756 0 0 1-.169.5a1.13 1.13 0 0 1-.363.36a.673.673 0 0 1-.416.106m5.077-3.915h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892"/></svg>
    };

    useEffect(() => {
        handleNameClick(clientId,1,"","Users",2);
    },[clientId]);
      
    const getFileIcon = (filename,itemType) => {
      if(itemType==1)
      {
        return FILE_ICONS['user'];
      }
      else if(itemType===2 || itemType===3)
      {
            return FILE_ICONS['folder'];
      }
      const extension = filename.split('.').pop().toLowerCase();
        return FILE_ICONS[extension] || FILE_ICONS['file']
    };

    const handleNameClick = async (id, itemType,userid,name,type) => {
      // console.log(id);
        if (itemType != 4) {
          setLoading(true);
          if(type === 2)
          {
            const cli={
              name:name,
              itemType:itemType,
              userId:userid,
              id:id
            } 
            const newList = path.concat(cli);
            setPath(newList);
          }
          else if(type!==3)
             {
              const index = path.findIndex(item => item.id === id);
              if(index >= 0)
              {
              const elementsBeforeIndex = path.slice(0, index+1);
              setPath(elementsBeforeIndex);
              }
             }
            try {
                const requestData = {
                    parentId: id,
                    userId: userid
                };
    
                const response = await axios.post(`http://localhost:8080/search/clients/${clientId}`, requestData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(type!==3)
                {
                setData(response.data);
                }
                if(rootData.length===0)
                {
                  setRootData(response.data);
                }
                setLoading(false);
                return response.data;
            } catch (err) {
                console.error("Error fetching data:", err);
            }
            setLoading(false);
            return [];
        }  
    };

    const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  
  const columns2 = [
    {
      cell: (row) => (
        <div>
           {getFileIcon(row.name_s,row.itemType_i)}
        </div>
      ),
      width: '30px',
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
        name: 'Name',
        //sortable:true,
        selector: row => row.name_s,
        cell: (row) => (
          <div>
            <Link
                  component="button"
                  variant="body1"
                  underline="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNameClick(row.id,row.itemType_i,row.userId_s,row.name_s,2)
                  }}
                >
                  <span style={{ color: '#202124', fontSize: '14px', fontWeight: 500 }}>{row.name_s}</span>
                </Link>
          </div>),
    },
    {
      name: 'id',
      selector: row => row.id,
  },
    {
      name:'Path',
      selector: row => row.path_s,

    },
    {
      name:'Actions',
      cell: row => <Actions  clientId={clientId} size="small" row={row} />,
      allowOverflow: true,
      button: true,
      width: '60px',
    },
    
];

  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div style={{ height: '100%', width: '100%' ,marginTop:'2px' , padding:'20px'}}>
     <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
     <video width="200" height="100" controls={false} autoPlay loop muted >
        <source src={browsevideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  {azuresvg}
  <Typography variant="h5" gutterBottom sx={{ marginLeft: '10px', marginBottom: '0' }}>
    {clientName}
  </Typography>
 
</div>
<Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <Stack direction='row' width='90%' spacing='50px'>
      <Tree treeData={root} handleNameClick={handleNameClick} getFileIcon={getFileIcon}/>
      <Stack sx={{ width: '100%' }}>
      <Breadcrumbs aria-label="hierachy"   sx={{marginTop:'10px'}} separator={<NavigateNextIcon fontSize="small" />}>
      {path.map((item, index) => ( 
            <Chip
                label={item.name}
                component="a"
                clickable
                onClick={() => {
                          handleNameClick(item.id,item.itemType,item.userId,item.name,1);
                        }}
                disabled={index === path.length - 1}
              />
        ))}
      </Breadcrumbs>
      <OneDriveFilesTable data={data} columns={columns2}/>
      </Stack>
      </Stack>
    </div>
  );
}

export default Browse;
